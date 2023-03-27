const Tipos = require("../models/tiposPokemon");


exports.GetTiposList = (req, res, next) => {
    Tipos
        .findAll()
        .then((result) => {
        const tipo = result.map((result) => result.dataValues);
    
        res.render("Tipos/tipo-list", {
            pageTitle: "Tipos Pokemon",
            
            tipoActive: true,
            tipo: tipo,
            hasTipo: tipo.length > 0,
        });
        })
        .catch((error) => {
        console.log(error);
        });
}

exports.GetCreateTipo = (req, res, next) => {
    res.render("Tipos/save-tipos", {
        pageTitle: "Create Tipo",
        tipoActive: true,
        editMode: false,
    });
}

exports.PostCreateTipo = (req, res, next) => {

    const tipoName = req.body.Name;
    Tipos.create({name: tipoName})
    .then((result) => {
        res.redirect("/Tipos");
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.GetEditTipo = (req, res, next) => {
    const tipoId = req.params.Id;
    const edit = req.query.edit;
    if (!edit) {
        return res.redirect("/");
    }
    Tipos.findOne({ where: { id: tipoId } })
        .then((result) => {
            const tipo = result.dataValues;
            if(!tipo){
                return res.redirect("/");
            }
            res.render("Tipos/save-tipos", {
                pageTitle: "Editar Tipo",
                tipoActive: true,
                editMode: edit,
                tipo: tipo,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.PostEditTipo = (req, res, next) => {
    const tipoId = req.body.Id;
    const tipoName = req.body.Name;
    Tipos.update({name: tipoName},{where: {id: tipoId}})
    .then((result) => {
        res.redirect("/Tipos");
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.PostDeleteTipo = (req, res, next) => {
    const tipoId = req.body.Id;
    Tipos.destroy({where: {id: tipoId}})
    .then((result) => {
        res.redirect("/Tipos");
    })
    .catch((err) => {
        console.log(err);
    });
}