import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function NavigationLine({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.6929 9.8104C11.2144 8.7605 12.699 8.7805 13.2789 9.7604L18.843 20.8785C19.4252 22.0483 18.3088 23.3381 17.0747 22.9182L11.9993 21.2285L6.924 22.9182C5.6899 23.3281 4.5742 22.0483 5.1557 20.8785L10.6929 9.8104ZM12.0003 1.0018C12.5523 1.0018 13.0001 1.4517 13.0001 2.0016V6.001C13.0001 6.5509 12.5523 7.0008 12.0003 7.0008C11.4481 7.0008 11.0005 6.5509 11.0005 6.001V2.0016C11.0005 1.4517 11.4481 1.0018 12.0003 1.0018Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 6.001V2.0016M6.051 21.3285L11.5882 10.2503C11.7579 9.9203 12.2421 9.9203 12.4118 10.2503L17.9489 21.3285C18.1325 21.6984 17.7807 22.0983 17.3916 21.9784L12.1456 20.2286C12.0511 20.1887 11.9489 20.1887 11.8544 20.2286L6.6085 21.9784C6.2193 22.0983 5.8676 21.6984 6.051 21.3285Z"/>
    </svg>
  )
}
