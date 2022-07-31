const express = require('express');

const SellBuy = require('../mongoose/models/sellAndbuy');


const sellAndBuyRouter = new express.Router();


sellAndBuyRouter.get('/sellProduct', async (req,res) => {
    const query = req.query;

    if(Object.keys(query).length===0) {
        const data = await SellBuy.find({});
        res.status(200).send(data);
    } else {
        if(query.product) {
            const data = await SellBuy.find({ productName: query.product});
            res.status(200).send(data);    
            return
        } else {
            const data  = await SellBuy.find({});

            if(req.query.sortBy === 'lowerSoldPrice') {
                let lspSortedData = [...data];
                lspSortedData.sort( (a, b) => ((a["soldPrice"] ?? 0)-(b["soldPrice"]) ?? 0));
                res.status(200).send(lspSortedData);
                return;
            }

            if(req.query.sortBy === 'higherSoldPrice') {
                let hspSortedData = [...data];
                hspSortedData.sort( (a, b) => (b["soldPrice"]-a["soldPrice"]));
                res.status(200).send(hspSortedData);
                return;
            }

            if(req.query.sortBy === 'lowerCostPrice') {
                let lcpSortedData = [...data];
                lcpSortedData.sort( (a, b) => (a["costPrice"]-b["costPrice"]));
                res.status(200).send(lcpSortedData);
                return;
            }

            if(req.query.sortBy === 'higherCostPrice') {
                let hcpSortedData = [...data];
                hcpSortedData.sort( (a, b) => (b["costPrice"]-a["costPrice"]));
                res.status(200).send(hcpSortedData);
                return;
            }
        }

    }
});

sellAndBuyRouter.post('/sellProduct', async (req, res) => {
    const data = req.body;
    const errorMsg = {
        productName: 'product name should have minimum of four characters',
        costPrice: "cost price value cannot be zero or negative value"
    }
    let errorKey = false;

    if(data && data.productName.length<=3){ errorKey = 'productName';}
    if(data && data.costPrice<=0) {errorKey = 'costPrice';}
    if(errorKey){
        res.status(400).send({error: errorMsg[errorKey]});
        return;
    };

    console.log('Entering line 71')
    try{
        await SellBuy.create(data);
        res.status(201).send({message: 'Product Added'});
        return;
    } catch (err) {
        res.status(500).send(err)
    }
});


sellAndBuyRouter.patch('/sellProduct/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if(body.soldPrice<=0) {
        res.status(400).send({error: "sold price value cannot be zero or negative value"});
        return;
    }
    await SellBuy.findById(id).update({ soldPrice: body.soldPrice});
    
    res.status(200).send({message: "Updated Successfully"});
    return;
});

sellAndBuyRouter.delete('/sellProduct/:id', async (req, res) => {
    
    const id = req.params.id;

   if(Object.keys(id).length === 24) {
    await SellBuy.deleteOne({id: id});
    res.status(200).send({message: 'Deleted successfully'});
    return;
   } else {
    res.status(400).send();
   }
})


module.exports = sellAndBuyRouter;