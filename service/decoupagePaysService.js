import fs from "fs/promises";

export  async function get_all(req,res){

    try {
        let regionsData = await fs.readFile('models/data/region.json', 'utf-8');
        let regions = JSON.parse(regionsData);

        let citiesData = await fs.readFile('models/data/ville.json', 'utf-8');
        let cities = JSON.parse(citiesData);

        let subPrefecturesData = await fs.readFile('models/data/subPref.json', 'utf-8');
        let subPrefectures = JSON.parse(subPrefecturesData);

        let result = regions.map(region => {
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
        throw error;
    }
}
