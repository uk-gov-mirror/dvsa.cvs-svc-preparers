import PreparersDAO from "../../src/models/PreparersDAO";
import preparers from "../resources/preparers.json";
import * as _ from "lodash";

export const populateTestDatabase = async () => {
    const full: boolean = false;
    await populateDatabase(full);
};

export const populateDatabase = async (full = true) => {
    const preparersMockDB = _.cloneDeep(preparers);
    const preparersDAO = new PreparersDAO();

    const batches = [];
    while (preparersMockDB.length > 0) {
        batches.push(preparersMockDB.splice(0, 25));
    }

    for (const batch of batches) {
        await preparersDAO.createMultiple(batch);
    }

    // if (full) {
    //     await preparersDAO.createMultiple(preparersMockDB);
    // } else {
    //     await preparersDAO.createMultiple(preparersMockDB.splice(0, 5));
    // }
};

//   const batches = [];
//   while (dataBuffer.length > 0) {
//     batches.push(dataBuffer.splice(0, 25));
//   }
//
//   batches.forEach((batch) => {
//     preparersService.deletePreparerList(
//         batch.map((item: any) => {
//           return item.preparerId;
//         })
//     );
//   });

export const emptyTestDatabase = async () => {

    const full: boolean = false;
    await emptyDatabase(full);
};

export const emptyDatabase = async (full = true) => {
    const ids = _.cloneDeep(preparers).map((prep) => prep.preparerId);
    const preparersDAO = new PreparersDAO();

    const batches = [];
    while (ids.length > 0) {
        batches.push(ids.splice(0, 25));
    }

    for (const batch of batches) {
        await preparersDAO.deleteMultiple(batch);
    }

    // if (full) {
    //     await preparersDAO.deleteMultiple(_.cloneDeep(ids));
    // } else {
    //     await preparersDAO.deleteMultiple(_.cloneDeep(ids).splice(0, 5));
    // }
};


