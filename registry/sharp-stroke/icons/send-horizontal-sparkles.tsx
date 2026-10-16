import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SendHorizontalSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M4.8881 20.556L2 22L3.8856 12L2 2L22 12L15.8393 15.0804M3.8856 12L22 12"/>
      <path d="M12.0492 15.3739L12.9196 17.5804L15.1261 18.4508C15.3518 18.5397 15.5 18.7576 15.5 19C15.5 19.2424 15.3518 19.4603 15.1261 19.5492L12.9196 20.4196L12.0492 22.6261C11.9603 22.8518 11.7424 23 11.5 23C11.2576 23 11.0397 22.8518 10.9508 22.6261L10.0804 20.4196L7.8739 19.5492C7.6482 19.4603 7.5 19.2424 7.5 19C7.5 18.7576 7.6482 18.5397 7.8739 18.4508L10.0804 17.5804L10.9508 15.3739C11.0397 15.1482 11.2576 15 11.5 15C11.7424 15 11.9603 15.1482 12.0492 15.3739ZM20.8433 17.2337L21.3873 18.6127L22.7663 19.1567C22.9074 19.2123 23 19.3485 23 19.5C23 19.6515 22.9074 19.7877 22.7663 19.8433L21.3873 20.3873L20.8433 21.7663C20.7877 21.9074 20.6515 22 20.5 22C20.3485 22 20.2123 21.9074 20.1567 21.7663L19.6127 20.3873L18.2337 19.8433C18.0926 19.7877 18 19.6515 18 19.5C18 19.3485 18.0926 19.2123 18.2337 19.1567L19.6127 18.6127L20.1567 17.2337C20.2123 17.0926 20.3485 17 20.5 17C20.6515 17 20.7877 17.0926 20.8433 17.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
