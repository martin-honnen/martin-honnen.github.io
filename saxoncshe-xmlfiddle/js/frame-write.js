function writeResult(frame, result) {
    var frameDoc = frame.document;
    frameDoc.open();
    frameDoc.write(result);
    frameDoc.close();
}