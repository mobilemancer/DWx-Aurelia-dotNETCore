mkdir "./styling";
mkdir "./styling/external";
mkdir "./src/styling/external/bourbon";
mkdir "./src/styling/external/bourbon-neat";
mkdir "./src/styling/external/bourbon-bitters";

xcopy /s "./node_modules/bourbon/app/assets/stylesheets" "./src/styling/external/bourbon"
xcopy /s "./node_modules/bourbon-neat/app/assets/stylesheets" "./src/styling/external/bourbon-neat"
xcopy /s "./node_modules/bourbon-bitters/app/assets/stylesheets" "./src/styling/external/bourbon-bitters"
