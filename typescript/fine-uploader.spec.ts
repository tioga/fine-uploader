/**
 * Prepare/set options for the core FineUploader
 */
let coreOptions: FineUploader.CoreOptions;
coreOptions.debug = true;
coreOptions.autoUpload = false;
coreOptions.request.endpoint = "/uploads";

/**
 * Instantiate the FineUploader and pass in the coreOptions
 */
let uploader: FineUploader.qq = new qq.FineUploader(coreOptions);

/**
 * Manually upload files to the server. This method should be called on some button click event
 */
uploader.uploadStoredFiles();

//utility functions
let myDiv: HTMLElement, qqMyDiv: FineUploader.qq;
myDiv = document.getElementById("myDiv");
qqMyDiv = qq(myDiv);

// Now we can call other qq methods:
qqMyDiv.hide();
let children: HTMLElement[] = qqMyDiv.children(myDiv);