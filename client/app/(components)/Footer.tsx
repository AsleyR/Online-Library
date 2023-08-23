export default function Footer() {
    const projectGithubUrl = 'https://github.com/AsleyR/Online-Library'

    return (
        <footer className="grid w-full py-[1rem] bg-gray-100 border-t border-gray-300">
            <p className="text-center text-gray-600">Asley Robleto. 2023. See project on <a href={projectGithubUrl} target={'_blank'} className="text-blue-500 hover:text-blue-600 duration-100">GitHub</a>.</p>
        </footer>
    )
}