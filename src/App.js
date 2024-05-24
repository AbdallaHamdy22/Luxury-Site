import './App.css';
import Navbar from './Components/Header/Nav';
import DropdownMenus from './Components/Header/DropDownMenu';
import HeroSection from './Components/Home/HeroSection';
import SaleBanner from './Components/Home/Sale';
import CategorySection from './Components/Home/Category';
import BrandSection from './Components/Home/Brand';
import NewArrivalsSection from './Components/Home/NewArrival';
import InformationSection from './Components/Home/Info';
import Footer from './Components/Footer/Footer';
//fnjfnkmf
function App() {
  return (
    <div className="App">
      <Navbar />
      <DropdownMenus />
      <HeroSection />
      <SaleBanner />
      <CategorySection />
      <BrandSection />
      <NewArrivalsSection />
      <InformationSection />
      <Footer />
    </div>
  );
}

export default App;