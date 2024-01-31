
# Import Deep Learning
### Import de base
```py
    import numpy as np
        #Generate rdm point
        t = np.linspace(0,100,50).reshape(-1, 1)
```

#### Split Samples
```py
    from sklearn.model_selection import train_test_split
```
## Import Visualisation
```py
    import matplotlib.pyplot as plt
```

## Import Dataset Scikit
```py
    from sklearn.datasets import data 
        - load_digits - fetch_california_housing - make_blobs
            X, y = make_blobs(n_samples=100, centers=3, n_features=2, random_state=0)
```
## Linear model
##### Regression
```py
    from sklearn.linear_model import LinearRegression
    from sklearn.linear_model import Ridge
    from sklearn.linear_model import Lasso
```
##### Classification
```py
    from sklearn.linear_model import LogisticRegression as LR
```
## Knn model
##### Regression
```py
    from sklearn.neighbors import KNeighborsRegressor
```
##### Classification
```py
    from sklearn.neighbors import KNeighborsClassifier 
        model = KNeighborsClassifier(n_neighbors= n)
```
## Decision tree model
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
## Rdm Forest model
##### Regression
```py
    from sklearn.ensemble import RandomForestRegressor
```
##### Classification
```py
    from sklearn.ensemble import RandomForestClassifier as RF
```

## Polyonomial and Pipeline
```py
    from sklearn.preprocessing import PolynomialFeatures

    from sklearn.pipeline import Pipeline
        Pipeline([("PolyTransform", PolynomialFeatures(2)), ("LinearReg", LinearRegression())])
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
# Model Selection
### kfold & Grid
```py
    from sklearn.model_selection import StratifiedKFold, GridSearchCV
```
#### Check Wrong prediction
```py
    np.where(y_test != y_pred_test)[0]
```
#### Check feature importances
```py
    model.feature_importances_
```

#### Feature scaling & Normalisation
```py
    from sklearn.preprocessing import StandardScaler
    from sklearn.feature_selection import SequentialFeatureSelector as  SFS
```
