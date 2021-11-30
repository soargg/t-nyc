const { template } = require('@babel/core');

const toExoprtDefault = () => {
    let temp = null;
    return {
        visitor: {
            Program: {
                exit(path) {
                    if (temp && temp.node && temp.node.local) {
                        const identifierName = temp.node.local.name;
                        const exportDefaultTemp = template(`export default ${identifierName};`)
                        path.node.body.push(exportDefaultTemp());
                    }
                }
            },
            ExportDeclaration(path) {
                path.traverse({
                    ExportSpecifier(spePath) {
                        if (spePath.get('exported').isIdentifier({name: 'default'})) {
                            temp = spePath;
                        }
                    }
                });

                if (temp) {
                    path.remove(temp)
                }
            }
        }
    }
}

module.exports = {
    toExoprtDefault
}