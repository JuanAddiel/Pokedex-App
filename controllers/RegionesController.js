const regiones = require('../models/regiones');

exports.GetRegionesList = (req, res, next) => {
    regiones.findAll()
        .then((result) => {
            const region = result.map((result) => result.dataValues);

            res.render("regiones/regiones-list", {
                pageTitle: "Regiones",
                homeActive: true,
                region: region,
                hasRegion: region.length > 0,

            });
        })
        .catch((error) => {
            console.log(error);
        })
}

exports.GetCreateRegion = (req, res, next) => {
    
        res.render("regiones/save-regiones", {
            pageTitle: "Create Region",
            regionActive: true,
            editMode: false,
        });
    
}

exports.PostCreateRegion = (req, res, next) => {
    const RegionName = req.body.Name;
    regiones.create({
        name: RegionName
    })
        .then((result) => {
            res.redirect("/regiones");
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.GetEditRegion = (req, res, next) => {
    const regionId = req.params.Id;
    const edit = req.query.edit;
  
    if (!edit) {
      return res.redirect("/");
    }
  
    regiones.findOne({ where: { id: regionId } })
      .then((result) => {
        const region = result.dataValues;
  
        if (!region) {
          return res.redirect("/");
        }
  
        res.render("regiones/save-regiones", {
          pageTitle: "Editar Region",
          regionActive: true,
          editMode: edit,
          region: region,
        });
      })
      .catch((err) =>{ 
        console.log(err)
      });
  }

exports.PostEditRegion = (req, res, next) => {
    const regionId = req.body.Id;
    const regionName = req.body.Name;
    regiones.update({name: regionName},{where:{id:regionId}})
        .then((result) => {
            res.redirect("/regiones");
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.PostDeleteRegion = (req, res, next) => {
    const regionId = req.body.Id;
    regiones.destroy({where: {id: regionId}})
    .then((result) => {
        res.redirect("/regiones");
    })
    .catch((err) => {
        console.log(err);
    });
}