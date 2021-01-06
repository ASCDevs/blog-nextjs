import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(),'posts')

export function getSortedPostsData(){
    //Pega os arquivos do diretório /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName =>{
        //Remove a extensão ".md" do nome do arquivo para pegar id
        const id = fileName.replace(/\.md$/,'')

        //Lê o arquivo markdown como String
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath,'utf8')

        //Usa a biblioteca gray-matter para analisar os metadados da postagem
        const matterResult = matter(fileContents)

        //Combine os dados com o id
        return{
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort((a,b)=>{
        if(a.date < b.date){
            return 1
        }else{
            return -1
        }
    })
}