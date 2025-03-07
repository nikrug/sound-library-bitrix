import {fontGeneration} from "./config/fontMin";
import path from "path";

function main() {
    const inputDirectory = path.join(__dirname, 'src', 'app', 'styles', 'fonts')
    const styleFontFile = path.join(__dirname, 'src', 'app', 'styles', 'fonts.scss')
    void fontGeneration({
        inputDirectory,
        exclude: [],
        styleFontFile
    })
}

main()