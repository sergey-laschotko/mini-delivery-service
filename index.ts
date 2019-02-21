import { SimulateOrderAccepter } from "./order-accepter";
import { DeliveryManager } from "./delivery-manager";
import { testRoutes } from "./routes";

const orAc = new SimulateOrderAccepter(testRoutes);
const deliver = new DeliveryManager(testRoutes);
orAc.simulateDay(2000);
deliver.takeOrders(orAc.transferOrders());

const report = deliver.getReport();
console.log(report);
const setting = deliver.setToAutos();
console.log(setting);