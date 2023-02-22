import { createProgram, forEachChild, isJSDocCommentContainingNode, isTypeAliasDeclaration } from 'typescript';
import { readFileSync, writeFileSync } from 'fs';

type TypeName = string;
type JSDoc = string;

const generate = () => {
  const declarations: Record<TypeName, JSDoc> = {}
  
  const program = createProgram(['./src/index.ts'], {});
  program.getTypeChecker();

  program.getSourceFiles()
  .filter(({ fileName }) => fileName.includes('/type-testing/src/'))
  .forEach(sourceFile => {
    forEachChild(sourceFile, node => {
      if (isTypeAliasDeclaration(node)) {
        node.getChildren().forEach(child => {
          if (isJSDocCommentContainingNode(child)) {
            // @ts-expect-error
            declarations[node.name.text] = child.comment;
          }
        })
      }
    })
  });

  let readme = readFileSync('./scripts/API.source.md', 'utf-8');
  
  const regex = /\<\!-- Insert JSDoc: (?<typeName>.*) --\>/gm;
  readme = readme.split('\n').flatMap(line => {
    try {
      const { typeName } = line.matchAll(regex).next().value.groups;
      console.log('replacing: ', typeName);
      return declarations[typeName]
    } catch (error) {
    }
    
    return line;
  }).join('\n');


  writeFileSync('./API.md', readme);
};

generate();