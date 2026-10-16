import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalculatorSparkles({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19 11.9339L19 22L3 22L3 2L13 2M3 6L12 6M10 18L16 18"/>
      <path d="M8 10C8 10.5523 7.5523 11 7 11C6.4477 11 6 10.5523 6 10C6 9.4477 6.4477 9 7 9C7.5523 9 8 9.4477 8 10ZM8 14C8 14.5523 7.5523 15 7 15C6.4477 15 6 14.5523 6 14C6 13.4477 6.4477 13 7 13C7.5523 13 8 13.4477 8 14ZM8 18C8 18.5523 7.5523 19 7 19C6.4477 19 6 18.5523 6 18C6 17.4477 6.4477 17 7 17C7.5523 17 8 17.4477 8 18ZM18.5492 1.3739L19.4196 3.5804L21.6261 4.4508C21.8518 4.5397 22 4.7576 22 5C22 5.2424 21.8518 5.4603 21.6261 5.5492L19.4196 6.4196L18.5492 8.6261C18.4603 8.8518 18.2424 9 18 9C17.7576 9 17.5397 8.8518 17.4508 8.6261L16.5804 6.4196L14.3739 5.5492C14.1482 5.4603 14 5.2424 14 5C14 4.7576 14.1482 4.5397 14.3739 4.4508L16.5804 3.5804L17.4508 1.3739C17.5397 1.1482 17.7576 1 18 1C18.2424 1 18.4603 1.1482 18.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M12.8433 9.2337L13.3873 10.6127L14.7663 11.1567C14.9074 11.2123 15 11.3485 15 11.5C15 11.6515 14.9074 11.7877 14.7663 11.8433L13.3873 12.3873L12.8433 13.7663C12.7877 13.9074 12.6515 14 12.5 14C12.3485 14 12.2123 13.9074 12.1567 13.7663L11.6127 12.3873L10.2337 11.8433C10.0926 11.7877 10 11.6515 10 11.5C10 11.3485 10.0926 11.2123 10.2337 11.1567L11.6127 10.6127L12.1567 9.2337C12.2123 9.0926 12.3485 9 12.5 9C12.6515 9 12.7877 9.0926 12.8433 9.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
