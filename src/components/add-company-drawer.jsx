import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import useFetch from "../hooks/use-fetch";
import { addNewCompany } from "../api/apiCompanies";

const schema = z.object({
  name: z.string().min(1, { message: "company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file &&
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      { message: "only images are allowed" }
    ),
});

const Addcompanydrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onsubmit = (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" type="button" size="sm">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>

        <form className="flex flex-gap p-4 pb-0">
          <Input placeholder="company name" {...register("name")} />
          <Input
            type="file"
            accept="image/*"
            className="file:text-gray-500"
            {...register("logo")}
          />
          <Button
            type="button"
            onClick={handleSubmit(onsubmit)}
            variant="destructive"
            className="W-40"
          >
            Add
          </Button>
        </form>
        {errors.name && (
          <p className="text-red-500 text-sm px-4">{errors.name.message}</p>
        )}
        {errors.logo && (
          <p className="text-red-500 text-sm px-4">{errors.logo.message}</p>
        )}
        {errorAddCompany?.message && (
          <p className="text-red-500">{errorAddCompany?.message} </p>
        )}
        {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="variant" type="button">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Addcompanydrawer;
