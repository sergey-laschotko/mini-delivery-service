import { SimulateOrderAccepter } from "./order-accepter";
import { DeliveryManager } from "./delivery-manager";

const orAc = new SimulateOrderAccepter();
const deliver = new DeliveryManager();
orAc.simulateDay(2000);
deliver.takeOrders(orAc.transferOrders());

const report = deliver.getReport();
// console.log(report);
const setting = deliver.setToAutos();
console.log(setting);