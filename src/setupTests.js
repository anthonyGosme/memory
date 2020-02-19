// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import Adapter from "enzyme-adapter-react-16";
import chai from "chai";
import chaiJestSnapshot from "chai-Jest-Snapshot";
import enzymeToJson from "enzyme-to-json/serializer";

import { configure as configureEnzyme } from "enzyme";
import createChaiEnzyme from "chai-enzyme";
import createChaiJestDiff from "chai-jest-diff";
import dirtychai from "dirty-chai";
import sinonChai from "sinon-chai";
import "@testing-library/jest-dom/extend-expect";



chai
  .use(dirtychai)
  .use(createChaiJestDiff)
  .use(createChaiEnzyme())
  .use(chaiJestSnapshot)
  .use(sinonChai);
expect.addSnapshotSerializer(enzymeToJson);
configureEnzyme({ adapter: new Adapter() });
