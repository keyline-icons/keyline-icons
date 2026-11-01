import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Houses({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6.6149L5.7072 3.474C6.4532 2.842 7.5468 2.842 8.2928 3.474L10.363 5.2279M4 4.9204L4 10.6085"/>
      <path d="M12.0604 7.7109C12.6024 7.2519 13.2896 7 13.9999 7C14.7101 7 15.3973 7.2519 15.9393 7.7109L22.6463 13.3935C22.8703 13.5835 22.9995 13.8625 22.9995 14.1562C22.9995 14.7086 22.5517 15.1564 21.9993 15.1564C21.7628 15.1564 21.534 15.0726 21.3534 14.9199L20.9998 14.6201L20.9998 19C20.9997 20.6568 19.6566 21.9999 17.9998 22L9.9999 22C8.343 21.9999 6.9999 20.6568 6.9999 19L6.9999 14.6201L6.6463 14.9199C6.4658 15.0726 6.2369 15.1565 6.0004 15.1565C5.448 15.1565 5.0002 14.7086 5.0002 14.1562C5.0002 13.8625 5.1293 13.5835 5.3534 13.3935L12.0604 7.7109ZM12 20L16 20L16 18C16 16.8954 15.1046 16 14 16C12.8954 16 12 16.8954 12 18L12 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
