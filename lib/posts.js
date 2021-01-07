import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(),'posts')

export function getAllPostsIds(){
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/,'')
            }
        }
    })
}

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

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //Usa o gray-matter para analisar a seção de metadados da postagem
    const matterResult = matter(fileContents)

    //Usa a bibliotexa remark para converter o markdown em String HTML
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    //Combina os dados com o id e contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}