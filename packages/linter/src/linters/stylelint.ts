import argsParser from 'args-parser';
import stylelinter from 'stylelint';

import { log } from '../lib';

const args = argsParser(process.argv);

const lint = async () => {
  try {
    log.info('\nInspecting .scss...');
    const { fix = false } = args;

    const files = '**/*.scss';
    const formatter = 'string';
    const config = {
      rules: {
        'alpha-value-notation': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'order/properties-alphabetical-order': true,
        'selector-no-vendor-prefix': null,
      },
      extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
      plugins: ['stylelint-order'],
    };

    const result = await stylelinter.lint({
      config,
      files,
      formatter,
      fix,
    });

    result.report && log.log(result.report);

    if (result.errored) {
      return 1;
    }

    log.success('.scss is all good!');
    return 0;
  }
  catch (err: any) {
    throw new Error(err);
  }
};

export const stylelint = {
  lint,
};