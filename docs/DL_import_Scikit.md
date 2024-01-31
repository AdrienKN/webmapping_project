
# Import Deep Learning
## Base imports
#### Numpy
```py
    import numpy as np
        #Generate rdm point
        t = np.linspace(0,100,50).reshape(-1, 1)
```
#### Import Dataset Scikit
```py
    from sklearn.datasets import data 
        - load_digits - fetch_california_housing - make_blobs
            X, y = make_blobs(n_samples=100, centers=3, n_features=2, random_state=0)
```
#### Split Samples
```py
    from sklearn.model_selection import train_test_split
```
#### Import Visualisation
```py
    import matplotlib.pyplot as plt
```
#### Polyonomial and Pipeline
```py
    from sklearn.preprocessing import PolynomialFeatures

    from sklearn.pipeline import Pipeline
        Pipeline([("PolyTransform", PolynomialFeatures(2)), ("LinearReg", LinearRegression())])
```
#### Check Wrong prediction
```py
    np.where(y_test != y_pred_test)[0]
```
## Linear model
##### [Regression](https://mfauvel.frama.io/machine-learning/#orgb3d0da1) and [Extended linear models](https://mfauvel.frama.io/machine-learning/#org63bfeb3)
```py
    from sklearn.linear_model import LinearRegression
    from sklearn.linear_model import Ridge
    from sklearn.linear_model import Lasso
```
##### [Classification](https://mfauvel.frama.io/machine-learning/#org9422944)
```py
    from sklearn.linear_model import LogisticRegression as LR
```
## [Knn model](https://mfauvel.frama.io/machine-learning/#orgf9e49fa)
##### Regression
```py
    from sklearn.neighbors import KNeighborsRegressor
```
##### Classification
```py
    from sklearn.neighbors import KNeighborsClassifier 
        model = KNeighborsClassifier(n_neighbors= n)
```
## [Decision tree model](https://mfauvel.frama.io/machine-learning/#org9edec57)
```py
    from sklearn import tree
```
##### Regression
```py
    from sklearn.tree import DecisionTreeRegressor
```
##### Classification
```py
    from sklearn.tree import DecisionTreeClassifier
```
## [Rdm Forest model](https://mfauvel.frama.io/machine-learning/#orgf538d32)
##### Regression
```py
    from sklearn.ensemble import RandomForestRegressor
```
##### Classification
```py
    from sklearn.ensemble import RandomForestClassifier as RF
```
## Metrics
#### MSE
```py
    from sklearn.metrics import mean_squared_error as MSE
        mse = MSE(y, y_pred)

    from sklearn.metrics import accuracy_score as  OA
```
#### Confusion Matrix & Display
```py
    from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
        cm = confusion_matrix(y_test, model.predict(X_test), labels=np.unique(y))
        disp = ConfusionMatrixDisplay(confusion_matrix=cm,display_labels=np.unique(y))
        disp.plot()
```
## [Model Selection](https://mfauvel.frama.io/machine-learning/#org9459dc8)
#### [Kfold & Grid](https://mfauvel.frama.io/machine-learning/#org7727b4c)
```py
    from sklearn.model_selection import StratifiedKFold, GridSearchCV
```
## Data transfomration
#### [Feature scaling & Normalisation](https://mfauvel.frama.io/machine-learning/#orgfada680)
```py
    from sklearn.preprocessing import StandardScaler
    from sklearn.feature_selection import SequentialFeatureSelector as  SFS
```
#### [Select feature by importance](https://mfauvel.frama.io/machine-learning/#org35ca385)
```py
    model.feature_importances_
```
https://mfauvel.frama.io/machine-learning/#:~:text=5.2.%20Feature%20reduction

#### [Extract feature with PCA](https://mfauvel.frama.io/machine-learning/#org18c15e4)
```py
    from sklearn.decomposition import PCA
```

## Loop example for cross-validation
```py
from sklearn.datasets import load_diabetes
from sklearn.model_selection import StratifiedKFold, GridSearchCV, train_test_split
from sklearn.ensemble import RandomForestRegressor as RF
from sklearn.neighbors import KNeighborsRegressor as KNN
from sklearn.linear_model import Ridge as RID
from sklearn.metrics import mean_squared_error as MSE

# Load data
X, y = load_diabetes(return_X_y=True)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, train_size=0.5, random_state=0)

# Define hyperparameters
param_RID = {"alpha": [0.001, 0.01, 0.1, 1, 10]}
param_KNN = {"n_neighbors": [1, 5, 10, 50],
                "weights": ['uniform', 'distance']}
param_RF = {"n_estimators": [1, 10, 50, 100, 200, 400, 600],
          "max_depth": [1, 5, 10, 15, 20, 25]}

# Test models with best hyperparameters
for name, model, params in zip(["Ridge regression", "KN Neighbors", "Random Forest Regressor" ],
                            [RID(), KNN(), RF()],
                            [param_RID, param_KNN, param_RF]) :
    # Define the model
    model.fit(X_train, y_train)
    # Do Cross Validation
    grid = GridSearchCV(model,  # Set up the classifier
                        param_grid=params, cv= 5,
                        refit=True, n_jobs=-1) # Do the grid search in parallel
    grid.fit(X_train, y_train) # Run the grid search
    
    print(f"for the model {model}, best parameters are : {grid.best_params_} with a score of {grid.best_estimator_.score(X_test, y_test):.2f}")

print(f"We will perfom the modeling with {grid.best_estimator_}, with a score of {grid.best_estimator_.score(X_test, y_test):.2f}")
# Train model
best_estimator = grid.best_estimator_
best_estimator.fit(X_train, y_train)

print(f"Accuracy score on train dataset : {best_estimator.score(X_train, y_train)}")
print(f"Accuracy score on test dataset : {best_estimator.score(X_test, y_test)}")
```