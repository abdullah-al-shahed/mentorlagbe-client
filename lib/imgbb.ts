export async function uploadImage(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY
  if (!key) throw new Error("ImgBB API key is missing")
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5MB")

  const formData = new FormData()
  formData.append("image", file)
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  })
  const json = await res.json()
  if (!res.ok || !json?.data?.url) throw new Error("Image upload failed")
  return json.data.url as string
}