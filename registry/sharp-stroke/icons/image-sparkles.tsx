import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M20 11L20 22L2 22L2 4L13 4M2 19L8 13L12 17L16 14L20 18"/>
      <path d="M8.5 8.5C8.5 9.3284 7.8284 10 7 10C6.1716 10 5.5 9.3284 5.5 8.5C5.5 7.6716 6.1716 7 7 7C7.8284 7 8.5 7.6716 8.5 8.5ZM19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739ZM13.8433 7.2337L14.3873 8.6127L15.7663 9.1567C15.9074 9.2123 16 9.3485 16 9.5C16 9.6515 15.9074 9.7877 15.7663 9.8433L14.3873 10.3873L13.8433 11.7663C13.7877 11.9074 13.6515 12 13.5 12C13.3485 12 13.2123 11.9074 13.1567 11.7663L12.6127 10.3873L11.2337 9.8433C11.0926 9.7877 11 9.6515 11 9.5C11 9.3485 11.0926 9.2123 11.2337 9.1567L12.6127 8.6127L13.1567 7.2337C13.2123 7.0926 13.3485 7 13.5 7C13.6515 7 13.7877 7.0926 13.8433 7.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
