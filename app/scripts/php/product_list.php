<?php
require_once("../scripts/php/dbConnection.php");?>
<?php
dbConnect();
$sql  = "SELECT * FROM auction ORDER BY auctionID";
$result = $connection->query($sql);
?>
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Auction list</h2>
        <ol class="breadcrumb">
            <li>
                <a href="index.html">Home</a>
            </li>
            <li class="active">
                <strong>Auction list</strong>
            </li>
        </ol>
    </div>
    <div class="col-lg-2">

    </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div ng-controller="addItemCtrl" class="row">

    <div class="ibox-content m-b-sm border-bottom">
        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="control-label" for="status">Search by category</label>
                    <select class="form-control"  data-ng-model="data.category">
                        <option  ng-repeat="cat in data.categories track by cat.categoryID" value="{{cat.categoryID}}">{{cat.name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div>
            <button class="btn btn-primary" ng-click="searchauction({id:<?=$auction['auctionID']?>, other:'<?=$auction['name']?>'})">Search</button>
        </div>

    </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>

                            <th data-toggle="true">Auction Name</th>
                            <th data-hide="phone">Category</th>
                            <th data-hide="all">Description</th>
                            <th data-hide="phone">Instant Price</th>
                            <th data-hide="phone">Reserve Price</th>
                            <th data-hide="phone">Status</th>
                            <th class="text-right" data-sort-ignore="true">Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        <form action="createbid.php" method="GET">
                                <?php
                                while($auction = mysqli_fetch_array($result)) {
                                    // output data from each row
                                    ?>
                                    <tr>
                                    <td><?php echo $auction['name']; ?></td>
                            <td>
                                <?php echo $auction['categoryID']; ?>
                            </td>
                            <td>
                                <?php echo $auction['description']; ?>
                            </td>
                            <td>
                                £<?php echo $auction['instantPrice']; ?>
                            </td>
                            <td>
                            £<?php echo $auction['reservePrice']; ?>
                            </td>
                            <td>
                                <span class="label label-primary"><?php echo $auction['isActive']; ?></span>
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" ui-sref="product-details">View</button>
                                    <button class="btn-white btn btn-xs" type= "submit" ui-sref="createbid({id:<?=$auction['auctionID']?>, other:'<?=$auction['name']?>'})">Create Bid</button>
                                </div>
                            </td>
                        </tr>
                                    <?php
                                }
                                dbClose();
                                ?>
                        </form>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="6">
                                <ul class="pagination pull-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </div>
    </div>


</div>
<?php dbClose();?>