<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/common/common.jsp" %>
<layout:extends name="gnb">
<layout:put block="contents" type="append">
  <div class="container-fluid">
    <div class="page-header">
      <h1 class="page_title">
        금융자산 현황 상세
      </h1>
    </div>
    <table id="bankingStatus" class="display" data-page-length="15" cellpadding="0" width="100%">
      <thead>
        <tr>
          <th></th>
          <th>용도</th>
          <th>금융권/운용주체</th>
          <th>금융기관명</th>
          <th>상품유형</th>
          <th>상품명</th>
          <th>가입일</th>
          <th>만기일</th>
          <th>통화</th>
          <th>금리</th>
          <th>현지통화금액 </th>
          <th>환율</th>
          <th>원화환산금액</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th>용도</th>
          <th>금융권/운용주체</th>
          <th>금융기관명</th>
          <th>상품유형</th>
          <th>상품명</th>
          <th>가입일</th>
          <th>만기일</th>
          <th>통화</th>
          <th>금리</th>
          <th>현지통화금액 </th>
          <th>환율</th>
          <th>원화환산금액</th>
        </tr>
      </tfoot>
      <tbody>
      </tbody>
    </table>
</layout:put>
<layout:put block="js" type="append">
<script type="text/javascript" language="javascript" src="<c:out value="${context}"/>/static/js/banking/banking.js?version=<c:out value="${staticRsVersion}"/>"></script>
<script type="text/javascript" language="javascript" src="<c:out value="${context}"/>/static/js/common/gridArchive.js?version=<c:out value="${staticRsVersion}"/>"></script>
</layout:put>
</layout:extends>