import ENVConfig from "../../Utils/env.config";
import axios from "axios";
import formatDate from "../../Utils/formatDate";
import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
} from "@nextui-org/react";
import { FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Mod_AccepRejectOffer from "./Mod_AccepRejectOffer";
import PleaseLogin from "../PleaseLogin";
import { AuthContext } from "../../context/AuthProvider";

// Main App Component
const UD_MyMetrics = () => {
  const [requests, setRequests] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false); // to manage state when Axios fetch is having an error
  const { user } = useContext(AuthContext);
}
  export default function UD_MyMetrics;