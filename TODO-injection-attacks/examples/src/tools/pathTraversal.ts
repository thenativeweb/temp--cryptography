import fetch from 'node-fetch';

const fetchFile = async (path: string) => {
	const response = await fetch(`http://localhost:3000/image?fileName=${path}`);
	const status = response.status;
	const body = await response.text();

	return { status, body };
};

const findFile = async (fileName: string, maxLevels: number = 10) => {
    let path = fileName;

    for (let i = 0; i < maxLevels; i++) {
        const { status, body } = await fetchFile(path);

        if (status === 200) {
            return { path, body };
        }

        path = `../${path}`;
    }
}


console.log(
    JSON.stringify(
        await findFile(process.argv[2])
    )
);