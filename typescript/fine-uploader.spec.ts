let coreOptions: FineUploader.CoreOptions;
coreOptions.debug = true;
coreOptions.autoUpload = false;
coreOptions.request.endpoint = "/uploads";

//Uncommenting the following generates an error - only a void function can be called with the 'new' keyword. 
//let uploader1 = new qq.FineUploader(coreOptions);

let uploader = qq.FineUploader(coreOptions);
uploader.uploadStoredFiles();