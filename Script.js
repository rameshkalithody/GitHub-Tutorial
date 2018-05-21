/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.acme.Universe.BuyWater} tx The sample transaction instance.
 * @transaction
 */
async function BuyWater(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldValue = tx.ThisWater.value;

    // Update the asset with the new value.
    tx.ThisWater.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.acme.Universe.Water');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.ThisWater);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.acme.Universe', 'OnBuyingWater');
    event.ThisWater = tx.ThisWater;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
