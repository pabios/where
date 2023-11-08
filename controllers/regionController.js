import {get_all_region, get_city_by_region, get_subprefecture} from "../service/regionService.js";
// import * as fs from "fs";
import * as fs from 'fs/promises';
import res from "express/lib/response.js";

export async function readRegionsData() {
    try {
        // const regionsData = await fs.readFile('models/data/region.json', 'utf-8');
        // const regions = JSON.parse(regionsData);
        // console.log(regions);
        getAll().then(
            data => {
                return  data
            }
        ).catch(error => console.error(error));
    } catch (error) {
        console.error('Erreur de lecture du fichier :', error);
    }
}//

export async function getAll() {
    try {
        const regionsData = await fs.readFile('models/data/region.json', 'utf-8');
        const regions = JSON.parse(regionsData);

        const citiesData = await fs.readFile('models/data/ville.json', 'utf-8');
        const cities = JSON.parse(citiesData);

        const subPrefecturesData = await fs.readFile('models/data/subPref.json', 'utf-8');
        const subPrefectures = JSON.parse(subPrefecturesData);

        const result = regions.map(region => {
            const regionCities = cities.filter(city => city.region_id === region.id);
            const regionSubPrefectures = subPrefectures.filter(subPref => {
                const city = cities.find(city => city.id === subPref.ville_id);
                return city && city.region_id === region.id;
            });

            return {
                region:   (region) ,
                cities:  regionCities,
                subPrefectures:  regionSubPrefectures
            };
        });

        return result;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        throw error; // Vous pouvez gérer cette erreur de la manière appropriée pour votre application
    }
}



//
export async function getAllRegion(req, res){
    let response = await get_all_region(req,res);

    console.log(response)
    return response;
}

export async function getCityByRegion(req, res){
    let response = await get_city_by_region(req,res);

    console.log(response)
    return response;
}

export async function getSubprefecture(req, res){
    let response = await get_subprefecture(req,res);

    console.log(response)
    return response;
}
