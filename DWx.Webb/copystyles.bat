mkdir "./styles";
mkdir "./styles/bourbon";
mkdir "./styles/bourbon-neat";
mkdir "./styles/bourbon-bitters";

xcopy /s "./node_modules/bourbon/app/assets/stylesheets" "./styles/bourbon"
xcopy /s "./node_modules/bourbon-neat/app/assets/stylesheets" "./styles/bourbon-neat"
xcopy /s "./node_modules/bourbon-bitters/app/assets/stylesheets" "./styles/bourbon-bitters"
