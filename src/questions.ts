import path from 'node:path';
import fs from 'node:fs';

// Enum
import { EChoicesBoilerplate } from 'enum/choices-boilerplate.enum';
import { EErrors } from 'enum/errors.enum';
import { EGitName } from 'enum/git-name.enum';

export const questions = [
  {
    type: 'list',
    name: 'tech',
    message: 'Qual boilerplate devo criar?',
    choices: [EChoicesBoilerplate.NODEJS_TS, EChoicesBoilerplate.SCSS],
  },
  {
    type: 'input',
    name: 'folderName',
    message: 'Qual nome devo dar para a pasta do Projeto?',
    validate(folderName: string) {
      console.log(folderName);

      if (!folderName) return EErrors.ERROR_NULL;

      if (/[^\w\s-]/.test(folderName)) return EErrors.ERROR_SPECIAL_CHARACTERES;

      if (folderName === EGitName.NODEJS_TS || folderName === EGitName.SCSS)
        return EErrors.ERROR_GIT_NAME;

      try {
        const dir = path.resolve(folderName);
        fs.accessSync(dir, fs.constants.R_OK);
        return EErrors.ERROR_INVALID_FOLDER;
      } catch (error) {}

      return true;
    },
  },
];
