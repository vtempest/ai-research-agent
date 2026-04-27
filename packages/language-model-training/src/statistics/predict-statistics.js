import xgboost from 'xgboost_node';

/**
 * Trains an XGBoost model on preprocessed data and evaluates its performance.
 * 
 * XGBoost (eXtreme Gradient Boosting) works by sequentially building decision trees
 * where each new tree corrects errors made by the ensemble of previous trees.
 * It uses gradient descent to minimize a loss function by adding trees that
 * predict the residuals or errors of prior trees, then combining them through boosting.
 * The algorithm employs regularization techniques to prevent overfitting and handles
 * missing values effectively through its sparsity-aware split finding approach.
 * 
 * @param {Array<Object>} fullData - Preprocessed training data as array of objects with numeric values only
 * @param {string} targetName - Name of the target variable column to predict
 * @param {Object} options - Configuration options for model training
 * @param {Object} options.xgbParams - XGBoost hyperparameters like learning_rate, max_depth, etc.
 * 
 * // General Parameters
 * @param {number} options.xgbParams.verbosity - [default=1] Controls the verbosity of XGBoost's output
 *   0: silent mode (no messages)
 *   1: warnings only
 *   2: info messages
 *   3: debug messages
 * 
 * // Tree Booster Parameters (Control tree structure)
 * @param {number} options.xgbParams.max_depth - [default=6] Maximum depth of each tree
 *   Controls model complexity. Higher values create more complex trees that may overfit.
 *   Reduced from 8 to 6 to limit tree complexity and prevent overfitting.
 * 
 * @param {number} options.xgbParams.eta - [default=0.3, alias: learning_rate] Step size shrinkage
 *   Controls how much weight is given to new trees in each boosting round.
 *   Smaller values (0.1) make the model more robust by shrinking feature weights.
 *   Set to 0.1 to allow more conservative boosting, requiring more trees but improving generalization.
 * 
 * @param {string} options.xgbParams.objective - Specifies the learning task and objective
 *   'reg:squarederror': Regression with squared loss (minimize MSE)
 *   Options include classification objectives, ranking, and other regression metrics.
 * 
 * @param {number} options.xgbParams.nthread - Number of parallel threads used for training
 *   Set to 4 to utilize multi-core processing without overwhelming the system.
 * 
 * @param {number} options.xgbParams.subsample - [default=1] Fraction of training instances used per tree
 *   Values < 1 implement random sampling of the training data for each tree.
 *   Set to 0.9 to reduce overfitting by introducing randomness while using most of the data.
 * 
 * @param {number} options.xgbParams.colsample_bytree - [default=1] Fraction of features used per tree
 *   Controls feature sampling for each tree, similar to Random Forest.
 *   Set to 0.9 to reduce overfitting and create diverse trees.
 * 
 * @param {number} options.xgbParams.min_child_weight - [default=1] Minimum sum of instance weight in a child
 *   Controls the minimum number of instances needed in a leaf node.
 *   Set to 3 to prevent the model from creating overly specific rules based on few samples.
 * 
 * @param {number} options.xgbParams.gamma - [default=0, alias: min_split_loss] Minimum loss reduction for a split
 *   Controls the minimum reduction in the loss function required to make a split.
 *   Set to 0.1 to make splitting more conservative and reduce overfitting.
 * 
 * // Regularization Parameters
 * @param {number} options.xgbParams.alpha - [default=0, alias: reg_alpha] L1 regularization on weights
 *   Encourages sparsity by penalizing non-zero weights (feature selection).
 *   Set to 0 as gamma is being used for regularization.
 * 
 * @param {number} options.xgbParams.lambda - [default=1, alias: reg_lambda] L2 regularization on weights
 *   Penalizes large weights to prevent overfitting (similar to Ridge regression).
 *   Default value of 1 provides moderate regularization.
 * 
 * // Learning Control Parameters
 * @param {number} options.xgbParams.early_stopping_rounds - Stop training if performance doesn't improve
 *   Stops adding trees when the validation metric doesn't improve for specified rounds.
 *   Set to 20 to prevent overfitting by stopping when the model stops improving.
 * 
 * @param {number} options.xgbParams.seed - [default=0] Random number seed for reproducibility
 *   Set to 42 to ensure consistent results across training runs.
 * 
 * @param {number} options.xgbParams.nrounds - Number of boosting rounds (trees to build)
 *   Set to 1000 to compensate for the lower learning rate (eta),
 *   allowing the model to converge slowly but more accurately.
 * 
 * @param {number} options.testSize - Proportion of data to use for testing (default: 0.2)
 * @param {Array<string>} options.featuresToUse - Specific feature columns to use for training
 * @see [XGBoost_parameters](https://xgboost.readthedocs.io/en/release_3.0.0/parameter.html)
 * @returns {number} R² value (coefficient of determination) indicating model accuracy
 * @example
 *  let data = [
 *    {
 *      "feature1": 1,
 *      "feature2": 2,
 *      "target": 3
 *    }
 *  ];
 *  let options = {
 *    xgbParams: {
 *      verbosity: 0,
 *      max_depth: 7,
 *      eta: 0.07,
 *      objective: 'reg:squarederror',
 *      nthread: 4,
 *    }
 *  };
 *  let accuracy = await trainModels(data, 'target', options);
 *  console.log(accuracy);
*/
export async function trainModels(fullData, targetName, options = {}) {
  const {
    xgbParams = {
      'verbosity': 0,
      'max_depth': 7,                // Slightly increased with stronger regularization
      'eta': 0.07,                   // Reduced learning rate for better convergence
      'objective': 'reg:squarederror',
      'nthread': 4,
      'subsample': 0.85,             // Added stochasticity while maintaining data leverage
      'colsample_bytree': 0.8,       // More conservative feature sampling
      'colsample_bylevel': 0.8,      // Additional per-level sampling
      'min_child_weight': 5,         // Stronger protection against small leaves
      'gamma': 0.2,                  //   Increased split cost regularization
      'alpha': 0.1,                  // Mild L1 regularization
      'lambda': 1.5,                 // Stronger L2 regularization
      'early_stopping_rounds': 50,   // More patience for validation improvements
      'seed': 42,
      'nrounds': 2000,               // Increased with safer early stopping
      'tree_method': 'hist',         // Optimized for speed/accuracy balance
      'grow_policy': 'depthwise',     // Conservative growth strategy
      ...options.xgbParams
    },
    testSize = 0.1,
    featuresToUse
  } = options;

  // Extract features and target variables
  const features = fullData.map(row => {
    return {
      ...featuresToUse.reduce((obj, key) => {
        obj[key] = row[key];
        return obj;
      }, {})
    };
  }).filter(f => Object.values(f).length > 0);

  let featureArray = features.map(f => Object.values(f));
  featureArray = featureArray.map(row => row.map(Number));
  const target = fullData.map(row => row[targetName]);

  // Split data into training and testing sets
  const { trainFeatures, testFeatures, trainTarget, testTarget } = splitTrainTest(featureArray, target, testSize);

  // Prepare feature arrays for training
  const trainFeatureArray = Object.values(trainFeatures)
    .map(f => Object.values(f))
    .map(row => row.map(Number));
  const testFeatureArray = Object.values(testFeatures)
    .map(f => Object.values(f))
    .map(row => row.map(Number));


  // Remove NaN values from training data
  const validIndices = [];
  for (let i = 0; i < trainTarget.length; i++) {
    if (!isNaN(trainTarget[i])) {
      validIndices.push(i);
    }
  }

  const trainFeaturesClean = validIndices.map(i => trainFeatureArray[i]);
  const trainTargetClean = validIndices.map(i => trainTarget[i]);

  // Train model 
  await xgboost.train(trainFeaturesClean, trainTargetClean, xgbParams);

  //  evaluate performance
  const accuracy = calculateR2(
    await xgboost.predict(testFeatureArray),
    testTarget
  );

  return accuracy;
}

/**
 * Splits data into training and testing sets
 * @param {Array} features - Feature array
 * @param {Array} target - Target array
 * @param {number} testSize - Proportion of data to use for testing
 * @returns {Object} Split datasets
 */
function splitTrainTest(features, target, testSize = 0.2) {
  const totalSize = features.length;
  const testCount = Math.floor(totalSize * testSize);
  const trainCount = totalSize - testCount;

  // Shuffle indices
  const indices = Array.from({ length: totalSize }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Split data
  const trainIndices = indices.slice(0, trainCount);
  const testIndices = indices.slice(trainCount);

  return {
    trainFeatures: trainIndices.map(i => features[i]),
    testFeatures: testIndices.map(i => features[i]),
    trainTarget: trainIndices.map(i => target[i]),
    testTarget: testIndices.map(i => target[i])
  };
}

/**
 * Calculates Root Mean Square Error (RMSE) between actual and predicted values
 * @param {Array<number>} actual - Array of actual values
 * @param {Array<number>} predicted - Array of predicted values
 * @returns {number} Root Mean Square Error value
 */
function calculateRMSE(actual, predicted) {
  const squaredErrors = actual.map((val, i) => Math.pow(val - predicted[i], 2));
  const meanSquaredError = squaredErrors.reduce((sum, val) => sum + val, 0) / actual.length;
  return Math.sqrt(meanSquaredError);
}

/**
 * Calculates R-squared (coefficient of determination) between actual and predicted values
 * @param {Array<number>} predicted - Array of predicted values
 * @param {Array<number>} actual - Array of actual values
 * @returns {number} R-squared value between 0 and 1
 */
function calculateR2(predicted, actual) {
  const meanActual = actual.reduce((sum, val) => sum + val, 0) / actual.length;
  const totalSumSquares = actual.map(val => Math.pow(val - meanActual, 2))
    .reduce((sum, val) => sum + val, 0);

  const residualSumSquares = actual.map((val, i) => Math.pow(val - predicted[i], 2))
    .reduce((sum, val) => sum + val, 0);

  return Math.round((1 - (residualSumSquares / totalSumSquares)) * 100) / 100;
}

/**
 * Predicts target variable for future data using the trained XGBoost model
 * @param {Array<Object>} futureData - Array of weather data objects for future dates
 * @returns {Promise<Array<Object>>} Promise resolving to array of data objects with predictions
 */
export function predictFuture(futureData, options = {}) {
  const {
    featuresToUse
  } = options;

  // Extract only the required weather features from future data
  let futureDataClean = futureData.map(row => {
    return {
      ...featuresToUse.reduce((obj, key) => {
        obj[key] = row[key];
        return obj;
      }, {})
    };
  });

  // Convert features to array format for XGBoost prediction
  const featureArray = futureDataClean.map(f => Object.values(f))
  .map(row => row.map(Number)).filter(row => row.length > 1 && !!row[0]);

  console.log(featureArray);
  
  // console.log(JSON.stringify(featureArray));
  // Make predictions using the XGBoost model
  return xgboost.predict(featureArray)
    .then(predictions => {
      // Add predictions back to original data objects
      futureData.forEach((row, i) => {
        row.predicted = predictions[i];
      });
      return futureData;
    });
}
/**
 * Saves the trained XGBoost model to the specified file path
 * @param {string} modelPath - Path where the model should be saved
 * @returns {Promise<void>} Promise that resolves when the model is saved
 */
export async function saveModel(modelPath) {
  await xgboost.saveModel(modelPath);
}

/**
 * Loads a trained XGBoost model from the specified file path
 * @param {string} modelPath - Path to the saved model file
 * @returns {Promise<void>} Promise that resolves when the model is loaded
 */
export async function loadModel(modelPath) {
  await xgboost.loadModel(modelPath);
}




/**
 * Calculate rolling statistics for a given array of values
 * @param {Array} data - Array of data objects
 * @param {string} field - Field name to calculate rolling stats for
 * @param {number} window - Rolling window size
 * @returns {Array} Array with added rolling statistics
 */
export function calculateRollingStats(data, field, window = 7) {
  return data.map((item, index) => {
    if (index < window - 1) {
      // Not enough data points for full window, use the first value
      return {
        ...item,
        [`${field}_rolling_mean_${window}d`]: item[field],
        [`${field}_rolling_std_${window}d`]: item[field]
      };
    }
    
    // Get values for the rolling window
    const windowValues = data.slice(index - window + 1, index + 1)
      .map(d => d[field])
      .filter(val => val !== null && val !== undefined && !isNaN(val));
    
    if (windowValues.length === 0) {
      return {
        ...item,
        [`${field}_rolling_mean_${window}d`]: null,
        [`${field}_rolling_std_${window}d`]: null
      };
    }
    
    // Calculate rolling mean
    const mean = windowValues.reduce((sum, val) => sum + val, 0) / windowValues.length;
    
    // Calculate rolling standard deviation
    const variance = windowValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / windowValues.length;
    const std = Math.sqrt(variance);
    
    return {
      ...item,
      [`${field}_rolling_mean_${window}d`]: Math.floor(mean), // Round to 2 decimal places
      [`${field}_rolling_std_${window}d`]: Math.floor(std)
    };
  });
}
  
