const app = angular.module("myApp",[])
app.controller("myctrl",($scope, $http)=>{
    $scope.pri=0;
    $scope.storage="";
    $scope.qty=0;
    $scope.updatedd = {}

    $scope.list = []
    $scope.getData = ()=>{
        $http.get("/api/mobile").then((response)=>{
            $scope.list = response.data;
        })
    }

    $scope.displayData = (item)=>{
        $scope.qty = item.qty;
        $scope.pri = item.price;
        $scope.storage = item.s;
    }
//add mobile
   $scope.addData = () => {
    $http.post('/api/addmb',$scope.newmb).then((response)=>{
        $scope.list.push(response.data)
        $scope.newmb = {}
    })
   }

$scope.updatemb = (item) =>{
    $scope.temp = 1;
    $scope.updatedd = {
        "mid": item.mid,
        "mname": item.mname,
        "brand": item.brand,
        "price": item.price,
        "p": item.p,
        "s": item.s,
        "img": item.img,
        "qty": item.qty
    }}

    $scope.updateData = () =>{
        $http.put("/api/update",$scope.updatedd).then((res)=>{
            $scope.list = res.data;
            $scope.getData();
            $scope.temp = 0;
        })
    } 

    $scope.delete = (item) =>{
        $http.delete(`/api/mobile/${item.mid}`).then(function(response){ 
            $scope.list = response.data 
            $scope.getData(); 
            }) 
    }

    $scope.getData();
})