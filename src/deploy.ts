// import { execSync } from "child_process";
// import { readdirSync, writeFileSync } from "fs";
// import { join } from "path";
// import { askQuestion, readline } from "./command-line-utilities/askQuestion";
// import { CURRENT_PATH, getConfiguration } from "./configuration";
// import { clearFolderContent } from "./file-utilities/clearFolderContent";
// import { copyFolderContent } from "./file-utilities/copyFolderContent";
// import { isFile } from "./file-utilities/fileType";
// import { VERSION } from "./metadata";

// export async function deployNextApp() {
//     let configuration = getConfiguration();

//     if (!configuration) {
//         readline.close();
//         throw Error("Configuration not provided.");
//     }

//     let {
//         BuildFolderPath,
//         TargetRepoPath,
//         askBeforeCommit,
//         askToChangeEnvVariables,
//     } = configuration;

//     if (askToChangeEnvVariables) {
//         let files = readdirSync(CURRENT_PATH),
//             dotenvExists = false;

//         for (let index = 0; index < files.length; index++) {
//             if (files[index].startsWith(".env")) {
//                 dotenvExists = true;
//                 break;
//             }
//         }

//         if (dotenvExists) {
//             let decision = (
//                 await askQuestion(
//                     "Do you want to change any environment variable? [y|n]: "
//                 )
//             ).toLowerCase();

//             while (!["y", "n"].includes(decision))
//                 decision = (
//                     await askQuestion('Enter "y" or "n" only: ')
//                 ).toLowerCase();

//             if (decision === "y") {
//                 console.log(
//                     "\nPlease re-run previous command, after you change environment variables."
//                 );
//                 readline.close();
//                 process.exit();
//             }
//         }
//     }

//     try {
//         console.log("\nBuilding Next.js app...");
//         let build_output = execSync("npm run build");
//         console.log(`\n${build_output.toString()}`);
//     } catch (error) {
//         readline.close();
//         throw Error(
//             "\nMake sure to run this command from the root of Next.js app's repository."
//         );
//     }

//     await clearFolderContent(TargetRepoPath, [".git"]);
//     await copyFolderContent(BuildFolderPath, TargetRepoPath);

//     // Create ".nojekyll" file if it doesn't exist.
//     if (!isFile(join(TargetRepoPath, ".nojekyll"))) {
//         writeFileSync(join(TargetRepoPath, ".nojekyll"), "");

//         let MORE_INFO =
//             'It is necessary for hosting Next.js app on GitHub Pages. Read more: "https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/".';

//         console.log(
//             `\n".nojekyll" file created at "${TargetRepoPath}". ${MORE_INFO}`
//         );
//     }

//     console.log(`\nNext.js build folder is copied to "${TargetRepoPath}".`);

//     let pursh_to_remote_decision;

//     if (askBeforeCommit) {
//         // Ask if user want to perform git push.
//         pursh_to_remote_decision = (
//             await askQuestion("Push changes to the remote repository? [y|n]: ")
//         ).toLowerCase();

//         while (!["y", "n"].includes(pursh_to_remote_decision))
//             pursh_to_remote_decision = (
//                 await askQuestion('Enter "y" or "n" only: ')
//             ).toLowerCase();

//         if (pursh_to_remote_decision === "n")
//             console.log(
//                 `\nRepository "${TargetRepoPath}" is ready for manual commit.`
//             );
//     }

//     if (
//         !askBeforeCommit ||
//         (askBeforeCommit && pursh_to_remote_decision === "y")
//     ) {
//         let command = [
//             `cd ${TargetRepoPath}`,
//             "git add .",
//             `git commit -m "Auto-commit by next-deploy v${VERSION}"`,
//             "git push",
//         ].join(" && ");

//         try {
//             let output = execSync(command);
//             console.log(`\n${output}\n\n✨ Done`);
//         } catch (error) {
//             console.log(`\n${error}`);
//         }
//     }

//     console.log(
//         '\nThank you for using "next-deploy". Report issues at "https://github.com/kpverse/next-deploy/issues/new".\n'
//     );
//     readline.close();
//     process.exit();
// }
