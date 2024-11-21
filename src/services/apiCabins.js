import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {

  const { data, error } = await supabase
    .from('cabins')
    .select('*')
  if (error) {
    console.log(error)
    throw new Error("cabins could not be loaded")
  }
  return data
}


//this single fn use for both create and edit. prop newCabin for new creation and id prop for edit 
export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "") //supabase create new folder when found "/", we need to remove all the if there is any in image name
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create/Edit cabin

  let query = supabase.from('cabins');

  //A) Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }])
  }

  // B) Edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath })
      .eq('id', id)
    // .select()
  }
  const { data, error } = await query.select().single()

  if (error) {
    console.log(error)
    throw new Error(error.message)
    // throw new Error("cabin could not be created")
  }

  // 2.upload Image
  if (hasImagePath) return data
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. delete the cabin if there is error in uploading image
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created")
    // throw new Error(storageError.message)
  }
  return data

}
export async function deleteCabin(id) {

  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if (error) {
    console.log(error)
    throw new Error("cabin could not be deleted")
  }

  return data
}