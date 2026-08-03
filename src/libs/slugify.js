export default function slugify(name, id){
    const slugs = name.toLowerCase().replaceAll(" ", "-")
    return `${slugs}-${id}`
} 