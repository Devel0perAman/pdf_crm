import fs from "fs";
import path from "path";

interface StorageData {
  id: string;
  title: string;
  descriptionHtml?: string;
  textContent?: string;
}

export async function createRecordStorage(
  data: StorageData
) {
  const date = new Date()
    .toISOString()
    .split("T")[0];

  const folderPath = path.join(
    process.cwd(),
    "records",
    date,
    data.id
  );

  fs.mkdirSync(folderPath, {
    recursive: true,
  });

  // metadata.json

  fs.writeFileSync(
    path.join(folderPath, "metadata.json"),
    JSON.stringify(
      {
        id: data.id,
        title: data.title,
        createdAt:
          new Date().toISOString(),
      },
      null,
      2
    )
  );

  // html-content.html

  fs.writeFileSync(
    path.join(
      folderPath,
      "html-content.html"
    ),
    data.descriptionHtml || ""
  );

  // document.json

  fs.writeFileSync(
    path.join(folderPath, "document.json"),
    JSON.stringify(data, null, 2)
  );

  return folderPath;
}