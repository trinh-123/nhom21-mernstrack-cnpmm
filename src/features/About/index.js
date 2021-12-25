import React from "react";
import GuestLayout from "../../components/Layout/guest/GuestLayout.js";
import ImageGallery from "react-image-gallery";
import baner from "../../assets/images/banerAbout.jpg";
import imgContent1 from "../../assets/images/imageContent.jpg";
import imgContent2 from "../../assets/images/imageContent2.jpg";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import Toolbar from "@material-ui/core/Toolbar";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTop from "../../components/ScrollTop/ScrollTop";
import Fab from "@material-ui/core/Fab";
import "./index.scss";
import { Link } from "react-router-dom";

export default function About(props) {
  const images = [
    {
      original: slide1,
    },
    {
      original: slide2,
    },
    {
      original: slide3,
    },
  ];
  return (
    <GuestLayout>
      <Toolbar style={{ minHeight: "0px" }} id="back-to-top-anchor" />
      <div className="main">
        <div className="baner">
          <img src={baner} alt="baner" />
        </div>
        <div className="content-img">
          <h1>Trở thành nhà bán hàng NHT Sport</h1>
          <Link to="/user/register">
            <img src={imgContent1} alt="content1" />
          </Link>
          <h1>Tại sao nên chọn chúng tôi</h1>
          <img src={imgContent2} alt="content2" />
          <h1>Chỉ 3 bước để bán hàng trên NHT Sport</h1>
          <ImageGallery
            items={images}
            autoPlay={true}
            showThumbnails={false}
          />
        </div>
        <div className="content-detail">
          <h1> Bán hàng online trên NHT Sport - Khởi đầu thành công</h1>
          <h3>
            {" "}
            Người bán hàng mới tại NHT Sport luôn được hưởng chính sách ưu đãi
            và hỗ trợ công cụ để tối ưu hoá doanh thu:
          </h3>
          <h3> • Bán hàng hoàn toàn không bị mất phí, với 0% hoa hồng</h3>
          <h3>
            {" "}
            • Đội ngũ hỗ trợ bán hàng từ A-Z trong 90 ngày sau khi đăng ký{" "}
          </h3>
          <h3>
            {" "}
            • Được tham gia các khóa học kinh doanh cũng như những chia sẻ tận
            tâm để trở thành nhà bán hàng online thành công{" "}
          </h3>
          <h3>
            {" "}
            • Đặc biệt, ứng dụng Seller Center giúp bạn bán hàng và quản lý đơn
            hàng mọi lúc mọi nơi một cách tiện lợi, dễ dàng{" "}
          </h3>
          <h3>
            {" "}
            • Tạo dựng thương hiệu uy tín và rinh về hàng loạt đơn hàng khủng
            ngay hôm nay với NHT Sport
          </h3>
          <h1>
            {" "}
            Vì sao kênh bán hàng của chúng tôi luôn là lựa chọn hàng đầu của các
            nhà bán hàng thông minh?
          </h1>
          <h3>
            {" "}
            • Miễn phí tạo gian hàng trên kênh bán hàng NHT Sport : Chủ gian
            hàng không phải bỏ ra bất kỳ chi phí nào khi đăng ký tạo gian hàng
            trên NHT Sport. Không những vậy, sau khi đăng ký tạo gian hàng, bạn
            được phép đăng tải sản phẩm, sử dụng các công cụ bán hàng, thực hiện
            chiến dịch quảng bá đến người tiêu dùng đều hoàn toàn miễn phí và
            được hỗ trợ 24/7.
          </h3>
          <h3>
            • Đơn hàng vận chuyển toàn quốc nhanh chóng: NHT Sport có các đối
            tác vận chuyển uy tín, chuyên nghiệp phủ sóng khắp 63 tỉnh thành
            trên cả nước, sẵn sàng giao tận tay sản phẩm tới khách hàng của bạn
            một cách nhanh chóng.
          </h3>
          <p>Đăng kí ngay hôm nay chỉ với các bước đơn giản</p>
          <p>Bước 1: Đăng ký tài khoản nhà bán hàng</p>
          <p>Bước 2: Đăng tải sản phẩm</p>
          <p>Bước 3: Bán hàng và nhận đơn hàng</p>
          <p>Bước 4: Xử lý đơn hàng và giao hàng</p>
          <p>Bước 5: Nhận thanh toán</p>
        </div>
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </GuestLayout>
  );
}
