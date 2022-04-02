import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getApiUrl } from './settings';
import TaskConfirmModal from './TaskConfirmModal';
import LoadingOverlay from 'react-loading-overlay';
import AddDeploymentModal from './AddDeploymentModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RemedyChangeDetailsModal} from './RemedyChangeDetailsModal';
import { BasePage } from './basepage';


class ModulList extends BasePage {
}