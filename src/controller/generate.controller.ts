import fs from 'node:fs';
import path from 'node:path';
import shellJs from 'shelljs';

// Interface
import { IAnswers } from "interface/answers.interface";

// Enum
import { EChoicesBoilerplate } from "enum/choices-boilerplate.enum";
import { EGitName } from "enum/git-name.enum";

class GenerateController {
  public gen(answers: IAnswers) {
    try {
      switch (answers.tech) {
        case EChoicesBoilerplate.NODEJS_TS:
          this._execPath(EGitName.NODEJS_TS, answers.folderName);
          break;
          
        case EChoicesBoilerplate.SCSS:
          this._execPath(EGitName.SCSS, answers.folderName);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _execPath(gitName: string, folderName: string) {
    try {
      shellJs.cd(path.resolve());
      shellJs.exec(`git clone git@github.com:ailtonwl/${gitName}.git`);

      fs.renameSync(`${path.join(path.resolve(), gitName)}`, `${path.join(path.resolve(), folderName)}`);

      console.log('Arquivo criado com sucesso!');
      
      return shellJs.exit();
    } catch (error) {
      console.log(error);
    }    
  }
}

export const GenFile = new GenerateController();
