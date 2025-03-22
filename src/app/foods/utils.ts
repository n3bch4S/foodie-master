export function getUtUrl(fileKey: string): string {
  if (!process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID)
    throw new Error(`"NEXT_PUBLIC_UPLOADTHING_APP_ID" not found`);
  const appId = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;
  return `https://${appId}.ufs.sh/f/${fileKey}`;
}
