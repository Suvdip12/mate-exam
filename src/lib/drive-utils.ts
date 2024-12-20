export function getDirectDownloadLink(driveLink: string): string {
  if (driveLink.includes("drive.google.com/file/d/")) {
    const fileId = driveLink.split("/file/d/")[1].split("/")[0];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return driveLink;
}

export function downloadFile(url: string, filename: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
