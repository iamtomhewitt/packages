'use strict';

import { Rule } from 'eslint';

import shared from './shared';

// Adapted from https://github.com/lydell/eslint-plugin-simple-import-sort
const sortImportsRule: Rule.RuleModule = {
  meta: {
    type: 'layout',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          groups: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        additionalProperties: false,
      },
    ],
    docs: {
      url: 'https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order',
    },
    messages: {
      sort: 'Imports are in the wrong order. The import order should be: react related, third party, local, style',
    },
  },
  create: (context: any) => {
    const rawGroups = [
      // Packages `react` related packages come first.
      ['^react', '^@?\\w'],
      // Internal packages.
      ['^(@|components)(/.*|$)'],
      // Side effect imports.
      ['^\\u0000'],
      // Local imports. Put `..` last.
      ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
      // Style imports.
      ['^.+\\.?(css)$'],
    ];

    const outerGroups = rawGroups.map((groups) =>
      groups.map((item) => RegExp(item, 'u')),
    );

    const parents = new Set();

    return {
      ImportDeclaration: (node) => {
        parents.add(node.parent);
      },

      'Program:exit': () => {
        for (const parent of parents) {
          for (const chunk of shared.extractChunks(parent, (node: any) => isImport(node) ? 'PartOfChunk' : 'NotPartOfChunk')) {
            maybeReportChunkSorting(chunk, context, outerGroups);
          }
        }
        parents.clear();
      },
    };
  },
};

export default sortImportsRule;

function maybeReportChunkSorting(chunk: any, context: any, outerGroups: any) {
  const sourceCode = context.getSourceCode();
  const items = shared.getImportExportItems(
    chunk,
    sourceCode,
    isSideEffectImport,
    getSpecifiers,
  );
  const sortedItems = makeSortedItems(items, outerGroups);
  const sorted = shared.printSortedItems(sortedItems, items, sourceCode);
  const { start } = items[0];
  const { end } = items[items.length - 1];
  shared.maybeReportSorting(context, sorted, start, end);
}

function makeSortedItems(items: any[], outerGroups: any) {
  const itemGroups = outerGroups.map((groups: any[]) =>
    groups.map((regex) => ({
      regex,
      items: [],
    })),
  );
  const rest = [];

  for (const item of items) {
    const { originalSource } = item.source;
    const source = item.isSideEffectImport
      ? `\0${originalSource}`
      : item.source.kind !== 'value'
        ? `${originalSource}\0`
        : originalSource;
    const [matchedGroup] = shared
      .flatMap(itemGroups, (groups: any[]) =>
        groups.map((group) => [group, group.regex.exec(source)]),
      )
      .reduce(
        ([group, longestMatch]: any, [nextGroup, nextMatch]: any) =>
          nextMatch != null &&
            (longestMatch == null || nextMatch[0].length > longestMatch[0].length)
            ? [nextGroup, nextMatch]
            : [group, longestMatch],
        [undefined, undefined],
      );
    if (matchedGroup == null) {
      rest.push(item);
    }
    else {
      matchedGroup.items.push(item);
    }
  }

  return itemGroups
    .concat([[{
      regex: /^/,
      items: rest,
    }]])
    .map((groups: any[]) => groups.filter((group) => group.items.length > 0))
    .filter((groups: any[]) => groups.length > 0)
    .map((groups: any[]) =>
      groups.map((group) => shared.sortImportExportItems(group.items)),
    );
}

// Exclude 'ImportDefaultSpecifier' – the 'def' in `import def, {a, b}`.
function getSpecifiers(importNode: any) {
  return importNode.specifiers.filter((node: any) => isImportSpecifier(node));
}

// Full import statement.
function isImport(node: any) {
  return node.type === 'ImportDeclaration';
}

// import def, { a, b as c, type d } from 'A'
//               ^  ^^^^^^  ^^^^^^
function isImportSpecifier(node: any) {
  return node.type === 'ImportSpecifier';
}

// import 'setup'
// But not: import {} from 'setup'
// And not: import type {} from 'setup'
function isSideEffectImport(importNode: any, sourceCode: any) {
  return (
    importNode.specifiers.length === 0 &&
    (!importNode.importKind || importNode.importKind === 'value') &&
    !shared.isPunctuator(sourceCode.getFirstToken(importNode, {
      skip: 1,
    }), '{')
  );
}
