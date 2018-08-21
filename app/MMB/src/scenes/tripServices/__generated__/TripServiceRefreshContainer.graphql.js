/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type CarRentalMenuItem$ref = any;
type HotelMenuItem$ref = any;
type LoungeMenuItem$ref = any;
type ParkingMenuItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type TripServiceRefreshContainer$ref: FragmentReference;
export type TripServiceRefreshContainer = {|
  +databaseId: ?number,
  +authToken: ?string,
  +availableWhitelabeledServices: ?{|
    +$fragmentRefs: CarRentalMenuItem$ref & LoungeMenuItem$ref & ParkingMenuItem$ref & HotelMenuItem$ref
  |},
  +$refType: TripServiceRefreshContainer$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "TripServiceRefreshContainer",
  "type": "BookingInterface",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "databaseId",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "authToken",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "availableWhitelabeledServices",
      "storageKey": null,
      "args": null,
      "concreteType": "WhitelabeledServices",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CarRentalMenuItem",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "LoungeMenuItem",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "ParkingMenuItem",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "HotelMenuItem",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'f1d6524f74d942192b699db2cef10e7e';
module.exports = node;