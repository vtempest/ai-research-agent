[neural-net-training](../modules.md) / statistics/predict-statistics

## calculateRollingStats()

```ts
function calculateRollingStats(
   data: any[], 
   field: string, 
   window: number): any[];
```

Defined in: [statistics/predict-statistics.js:303](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/statistics/predict-statistics.js#L303)

Calculate rolling statistics for a given array of values

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`data`

</td>
<td>

`any`[]

</td>
<td>

`undefined`

</td>
<td>

Array of data objects

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Field name to calculate rolling stats for

</td>
</tr>
<tr>
<td>

`window`

</td>
<td>

`number`

</td>
<td>

`7`

</td>
<td>

Rolling window size

</td>
</tr>
</tbody>
</table>

### Returns

`any`[]

Array with added rolling statistics

***

## loadModel()

```ts
function loadModel(modelPath: string): Promise<void>;
```

Defined in: [statistics/predict-statistics.js:289](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/statistics/predict-statistics.js#L289)

Loads a trained XGBoost model from the specified file path

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`modelPath`

</td>
<td>

`string`

</td>
<td>

Path to the saved model file

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`void`&gt;

Promise that resolves when the model is loaded

***

## predictFuture()

```ts
function predictFuture(futureData: Object[], options: object): Promise<Object[]>;
```

Defined in: [statistics/predict-statistics.js:243](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/statistics/predict-statistics.js#L243)

Predicts target variable for future data using the trained XGBoost model

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`futureData`

</td>
<td>

`Object`[]

</td>
<td>

Array of weather data objects for future dates

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ \}

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Object`[]&gt;

Promise resolving to array of data objects with predictions

***

## saveModel()

```ts
function saveModel(modelPath: string): Promise<void>;
```

Defined in: [statistics/predict-statistics.js:280](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/statistics/predict-statistics.js#L280)

Saves the trained XGBoost model to the specified file path

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`modelPath`

</td>
<td>

`string`

</td>
<td>

Path where the model should be saved

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`void`&gt;

Promise that resolves when the model is saved

***

## trainModels()

```ts
function trainModels(
   fullData: Object[], 
   targetName: string, 
   options: object): number;
```

Defined in: [statistics/predict-statistics.js:103](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/statistics/predict-statistics.js#L103)

Trains an XGBoost model on preprocessed data and evaluates its performance.

XGBoost (eXtreme Gradient Boosting) works by sequentially building decision trees
where each new tree corrects errors made by the ensemble of previous trees.
It uses gradient descent to minimize a loss function by adding trees that
predict the residuals or errors of prior trees, then combining them through boosting.
The algorithm employs regularization techniques to prevent overfitting and handles
missing values effectively through its sparsity-aware split finding approach.

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fullData`

</td>
<td>

`Object`[]

</td>
<td>

Preprocessed training data as array of objects with numeric values only

</td>
</tr>
<tr>
<td>

`targetName`

</td>
<td>

`string`

</td>
<td>

Name of the target variable column to predict

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ `featuresToUse`: `string`[]; `testSize`: `number`; `xgbParams`: \{ `alpha`: `number`; `colsample_bytree`: `number`; `early_stopping_rounds`: `number`; `eta`: `number`; `gamma`: `number`; `lambda`: `number`; `max_depth`: `number`; `min_child_weight`: `number`; `nrounds`: `number`; `nthread`: `number`; `objective`: `string`; `seed`: `number`; `subsample`: `number`; `verbosity`: `number`; \}; \}

</td>
<td>

Configuration options for model training

</td>
</tr>
<tr>
<td>

`options.featuresToUse`

</td>
<td>

`string`[]

</td>
<td>

Specific feature columns to use for training

</td>
</tr>
<tr>
<td>

`options.testSize`

</td>
<td>

`number`

</td>
<td>

Proportion of data to use for testing (default: 0.2)

</td>
</tr>
<tr>
<td>

`options.xgbParams`

</td>
<td>

\{ `alpha`: `number`; `colsample_bytree`: `number`; `early_stopping_rounds`: `number`; `eta`: `number`; `gamma`: `number`; `lambda`: `number`; `max_depth`: `number`; `min_child_weight`: `number`; `nrounds`: `number`; `nthread`: `number`; `objective`: `string`; `seed`: `number`; `subsample`: `number`; `verbosity`: `number`; \}

</td>
<td>

XGBoost hyperparameters like learning_rate, max_depth, etc.

// General Parameters

</td>
</tr>
<tr>
<td>

`options.xgbParams.alpha`

</td>
<td>

`number`

</td>
<td>

[default=0, alias: reg_alpha] L1 regularization on weights
  Encourages sparsity by penalizing non-zero weights (feature selection).
  Set to 0 as gamma is being used for regularization.

</td>
</tr>
<tr>
<td>

`options.xgbParams.colsample_bytree`

</td>
<td>

`number`

</td>
<td>

[default=1] Fraction of features used per tree
  Controls feature sampling for each tree, similar to Random Forest.
  Set to 0.9 to reduce overfitting and create diverse trees.

</td>
</tr>
<tr>
<td>

`options.xgbParams.early_stopping_rounds`

</td>
<td>

`number`

</td>
<td>

Stop training if performance doesn't improve
  Stops adding trees when the validation metric doesn't improve for specified rounds.
  Set to 20 to prevent overfitting by stopping when the model stops improving.

</td>
</tr>
<tr>
<td>

`options.xgbParams.eta`

</td>
<td>

`number`

</td>
<td>

[default=0.3, alias: learning_rate] Step size shrinkage
  Controls how much weight is given to new trees in each boosting round.
  Smaller values (0.1) make the model more robust by shrinking feature weights.
  Set to 0.1 to allow more conservative boosting, requiring more trees but improving generalization.

</td>
</tr>
<tr>
<td>

`options.xgbParams.gamma`

</td>
<td>

`number`

</td>
<td>

[default=0, alias: min_split_loss] Minimum loss reduction for a split
  Controls the minimum reduction in the loss function required to make a split.
  Set to 0.1 to make splitting more conservative and reduce overfitting.

// Regularization Parameters

</td>
</tr>
<tr>
<td>

`options.xgbParams.lambda`

</td>
<td>

`number`

</td>
<td>

[default=1, alias: reg_lambda] L2 regularization on weights
  Penalizes large weights to prevent overfitting (similar to Ridge regression).
  Default value of 1 provides moderate regularization.

// Learning Control Parameters

</td>
</tr>
<tr>
<td>

`options.xgbParams.max_depth`

</td>
<td>

`number`

</td>
<td>

[default=6] Maximum depth of each tree
  Controls model complexity. Higher values create more complex trees that may overfit.
  Reduced from 8 to 6 to limit tree complexity and prevent overfitting.

</td>
</tr>
<tr>
<td>

`options.xgbParams.min_child_weight`

</td>
<td>

`number`

</td>
<td>

[default=1] Minimum sum of instance weight in a child
  Controls the minimum number of instances needed in a leaf node.
  Set to 3 to prevent the model from creating overly specific rules based on few samples.

</td>
</tr>
<tr>
<td>

`options.xgbParams.nrounds`

</td>
<td>

`number`

</td>
<td>

Number of boosting rounds (trees to build)
  Set to 1000 to compensate for the lower learning rate (eta),
  allowing the model to converge slowly but more accurately.

</td>
</tr>
<tr>
<td>

`options.xgbParams.nthread`

</td>
<td>

`number`

</td>
<td>

Number of parallel threads used for training
  Set to 4 to utilize multi-core processing without overwhelming the system.

</td>
</tr>
<tr>
<td>

`options.xgbParams.objective`

</td>
<td>

`string`

</td>
<td>

Specifies the learning task and objective
  'reg:squarederror': Regression with squared loss (minimize MSE)
  Options include classification objectives, ranking, and other regression metrics.

</td>
</tr>
<tr>
<td>

`options.xgbParams.seed`

</td>
<td>

`number`

</td>
<td>

[default=0] Random number seed for reproducibility
  Set to 42 to ensure consistent results across training runs.

</td>
</tr>
<tr>
<td>

`options.xgbParams.subsample`

</td>
<td>

`number`

</td>
<td>

[default=1] Fraction of training instances used per tree
  Values < 1 implement random sampling of the training data for each tree.
  Set to 0.9 to reduce overfitting by introducing randomness while using most of the data.

</td>
</tr>
<tr>
<td>

`options.xgbParams.verbosity`

</td>
<td>

`number`

</td>
<td>

[default=1] Controls the verbosity of XGBoost's output
  0: silent mode (no messages)
  1: warnings only
  2: info messages
  3: debug messages

// Tree Booster Parameters (Control tree structure)

</td>
</tr>
</tbody>
</table>

### Returns

`number`

R² value (coefficient of determination) indicating model accuracy

### See

[XGBoost_parameters](https://xgboost.readthedocs.io/en/release_3.0.0/parameter.html)

### Example

```ts
let data = [
   {
     "feature1": 1,
     "feature2": 2,
     "target": 3
   }
 ];
 let options = {
   xgbParams: {
     verbosity: 0,
     max_depth: 7,
     eta: 0.07,
     objective: 'reg:squarederror',
     nthread: 4,
   }
 };
 let accuracy = await trainModels(data, 'target', options);
 console.log(accuracy);
```
