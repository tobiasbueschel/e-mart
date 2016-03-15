<?php
require_once("/Users/Johnnie/Documents/e-mart/app/scripts/php/dbConnection.php");?>
<?php
dbConnect();
session_start();
?>
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-10">
            <h2>My Bid List</h2>
            <ol class="breadcrumb">
                <li>
                    <a href="index.html">Home</a>
                </li>
                <li class="active">
                    <strong>My Bid List</strong>
                </li>
            </ol>
        </div>
        <div class="col-lg-2">

        </div>
    </div>
    <div class="wrapper wrapper-content animated fadeInRight ecommerce">
        <?php
        if (isset($_SESSION['email'])) {
            $emailAddress = $_SESSION['email'];
        }
        $sql2 = "SELECT * FROM auction a WHERE a.auctionID =(SELECT auctionID FROM bid WHERE bidderID = (SELECT userID FROM  user WHERE emailAddress = \"' . $emailAddress . '\"))";
        $result2 = $connection->query($sql2);
        ?>
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

                            <?php
                            while ($auction = mysqli_fetch_array($result2)) {
                                // output data from each row
                                ?>
                                <tr>
                                    <td><?php echo $auction['name']; ?></td>
                                    <td>
                                        <?php
                                        $sql3 = "SELECT name FROM category c WHERE c.categoryID = (SELECT categoryID FROM item WHERE itemID = {$auction['itemID']})";
                                        $result3 = $connection->query($sql3);
                                        while ($category = mysqli_fetch_array($result3)) {
                                            echo $category['name'];
                                        }?>
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
                                            <button class="btn-white btn btn-xs" ui-sref="product-details">View
                                            </button>
                                            <button class="btn-white btn btn-xs" type="submit"
                                                    ui-sref="createbid({id:<?= $auction['auctionID'] ?>, other:'<?= $auction['name'] ?>'})">
                                                Create Bid
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <?php
                            }
                            dbClose();
                            ?>

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