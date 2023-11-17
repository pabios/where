import {get_all} from "../service/decoupagePaysService.js";

export async function getAll(req, res) {
    let response = await get_all();
    return res.status(200).json(response);
}
