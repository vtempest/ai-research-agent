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
export function trainModels(fullData: Array<Object>, targetName: string, options?: {
    xgbParams: {
        verbosity: number;
        max_depth: number;
        eta: number;
        objective: string;
        nthread: number;
        subsample: number;
        colsample_bytree: number;
        min_child_weight: number;
        gamma: number;
        alpha: number;
        lambda: number;
        early_stopping_rounds: number;
        seed: number;
        nrounds: number;
    };
    testSize: number;
    featuresToUse: Array<string>;
}): number;
/**
 * Predicts energy output for future data using the trained XGBoost model
 * @param {Array<Object>} futureData - Array of weather data objects for future dates
 * @returns {Promise<Array<Object>>} Promise resolving to array of data objects with predictions
 */
export function predictFuture(futureData: Array<Object>, options?: {}): Promise<Array<Object>>;
/**
 * Saves the trained XGBoost model to the specified file path
 * @param {string} modelPath - Path where the model should be saved
 * @returns {Promise<void>} Promise that resolves when the model is saved
 */
export function saveModel(modelPath: string): Promise<void>;
/**
 * Loads a trained XGBoost model from the specified file path
 * @param {string} modelPath - Path to the saved model file
 * @returns {Promise<void>} Promise that resolves when the model is loaded
 */
export function loadModel(modelPath: string): Promise<void>;
/**
 * Calculate rolling statistics for a given array of values
 * @param {Array} data - Array of data objects
 * @param {string} field - Field name to calculate rolling stats for
 * @param {number} window - Rolling window size
 * @returns {Array} Array with added rolling statistics
 */
export function calculateRollingStats(data: any[], field: string, window?: number): any[];
